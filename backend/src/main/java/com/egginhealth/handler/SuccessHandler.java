package com.egginhealth.handler;

import com.egginhealth.data.dto.member.MemberDto;
import com.egginhealth.data.dto.member.NaverMemberDto;
import com.egginhealth.service.MemberService;
import com.egginhealth.util.CookieUtil;
import com.egginhealth.util.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final MemberService memberService;
    private final CookieUtil cookieUtil;

    @Value("${JWT_EXPIRED}")
    private int jwtExpired;

    @Value("${FRONT_URL}")
    private String frontUrl;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        MemberDto member = memberService.login(NaverMemberDto.from(oAuth2User.getAttributes()));

        String type = member.getType().name();
        String token = jwtUtil.createAccessToken(Integer.toString(member.getId()), type, jwtExpired);

        writeTokenResponse(response, token);

    }


    private void writeTokenResponse(HttpServletResponse response, String token) throws IOException {

        String role = jwtUtil.getRole(token);

        response.addCookie(cookieUtil.createCookie("Authorization", token, true));
        response.addCookie(cookieUtil.createCookie("Role", role, false));
        response.addCookie(cookieUtil.createCookie("Id", jwtUtil.getId(token), false));

        if (role.equals("TRAINER")) response.sendRedirect(frontUrl + "/trainermain");
        if (role.equals("MEMBER")) response.sendRedirect(frontUrl + "/membermain");
        if (role.equals("NONE")) response.sendRedirect(frontUrl + "/select");

    }
}
