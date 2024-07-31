package com.egginhealth.filter;

import com.egginhealth.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;


    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = Arrays.stream(request.getCookies())
                .filter(cookie -> "Authorization" .equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }


        if (Boolean.TRUE.equals(jwtUtil.isExpired(accessToken))) {
            filterChain.doFilter(request, response);
            return;
        }


        Map<String, Object> principal = Map.of(
                "id", jwtUtil.getId(accessToken),
                "role", jwtUtil.getRole(accessToken)
        );


        String role = "ROLE_" + jwtUtil.getRole(accessToken);

        Authentication authToken = new UsernamePasswordAuthenticationToken(principal, null, Collections.singleton(new SimpleGrantedAuthority(role)));
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);

    }
}
