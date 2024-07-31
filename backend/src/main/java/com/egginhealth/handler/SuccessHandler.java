package com.egginhealth.handler;

import com.egginhealth.data.dto.member.MemberDto;
import com.egginhealth.data.dto.member.NaverMemberDto;
import com.egginhealth.service.MemberService;
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
import java.io.PrintWriter;

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

        String type = "ROLE_" + member.getType();
        String token = jwtUtil.createAccessToken(Integer.toString(member.getId()), type, jwtExpired);


        writeTokenResponse(response, token);

    }


    private void writeTokenResponse(HttpServletResponse response, String token) throws IOException {

        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Authorization", token);
        response.setContentType("application/json;charset=UTF-8");

        PrintWriter writer = response.getWriter();
        writer.println(token);
        writer.flush();
    }

}
