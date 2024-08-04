package com.egginhealth.util;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    private final int jwtExpired;

    public CookieUtil(@Value("${JWT_EXPIRED}") int jwtExpired) {
        this.jwtExpired = jwtExpired;
    }

    public Cookie createCookie(String key, String value, Boolean isSecure) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(jwtExpired);
        cookie.setPath("/");
        cookie.setHttpOnly(isSecure);
        return cookie;
    }
}
