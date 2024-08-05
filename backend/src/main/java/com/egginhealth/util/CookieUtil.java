package com.egginhealth.util;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    private final int jwtExpired;

    private JWTUtil jwtUtil;

    public CookieUtil(@Value("${JWT_EXPIRED}") int jwtExpired, JWTUtil jwtUtil) {
        this.jwtExpired = jwtExpired;
        this.jwtUtil = jwtUtil;
    }

    public Cookie createCookie(String key, String value, Boolean isSecure) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(jwtExpired);
        cookie.setPath("/");
        cookie.setHttpOnly(isSecure);
        return cookie;
    }

    public Cookie createCookieAccessToken(String role) {
        String token = jwtUtil.createAccessToken(Integer.toString(SecurityUtil.getUserId()), role, jwtExpired);
        return createCookie("Authorization", token, true);
    }
}
