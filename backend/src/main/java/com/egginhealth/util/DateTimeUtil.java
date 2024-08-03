package com.egginhealth.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    private DateTimeUtil() {

    }

    public static LocalDateTime getStringToDateTime(String strDate){
        if(strDate.contains(".")){
            strDate = strDate.substring(0, strDate.indexOf("."));
        }
        return formatDateTime(strDate,"yyyy-MM-dd'T'HH:mm:ss");
    }

    public static LocalDateTime formatDateTime(String strDate, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return LocalDateTime.parse(strDate.replace("Z",""), formatter);
    }

    public static String getDateTimeToString(LocalDateTime dateTime){
        return formatString(dateTime,"yyyy-MM-dd'T'HH:mm:ss");
    }

    public static String formatString(LocalDateTime dateTime, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return dateTime.format(formatter);
    }

    public static LocalDateTime convertToLocalDateTime(String date) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, dateFormatter);
        return localDate.atStartOfDay();
    }

}
