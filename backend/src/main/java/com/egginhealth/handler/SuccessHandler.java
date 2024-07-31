package com.egginhealth.handler;

import com.egginhealth.data.dto.member.MemberDto;
import com.egginhealth.data.dto.member.NaverMemberDto;
import com.egginhealth.service.MemberService;
import com.egginhealth.util.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
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

    @Value("${JWT_EXPIRED}")
    private Long jwtExpired;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        MemberDto member = memberService.login(NaverMemberDto.from(oAuth2User.getAttributes()));

        String type = member.getType().name();
        String token = jwtUtil.createAccessToken(Integer.toString(member.getId()), type, jwtExpired);

        writeTokenResponse(response, token);

    }


    private void writeTokenResponse(HttpServletResponse response, String token) throws IOException {

        response.addCookie(createCookie("Authorization", token));
        String role = jwtUtil.getRole(token);
        response.addCookie(createCookie("Role", role));

        if (role.equals("TRAINER")) response.sendRedirect("http://localhost:5173/trainermain");
        if (role.equals("MEMBER")) response.sendRedirect("http://localhost:5173/usermain");
        if (role.equals("NONE")) response.sendRedirect("http://localhost:5173/select");

    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;

    }

}
