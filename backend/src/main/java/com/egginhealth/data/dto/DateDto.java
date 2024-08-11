package com.egginhealth.data.dto;

import java.time.LocalDateTime;

public record DateDto(
        int year,
        int month,
        int day
) {

    public LocalDateTime toLocalDateTime() {
        return LocalDateTime.of(year, month, day, 0, 0);
    }

    public static DateDto localDateTimeToDateDto(LocalDateTime date) {
        return new DateDto(date.getYear(), date.getMonthValue(), date.getDayOfMonth());
    }

}