package com.egginhealth.data.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponseDto {

    private final int status;
    private final String message;
    private final LocalDateTime time;
    private String stackTrace;
    private List<ValidationError> validErrors;

    private static record ValidationError(String field, String message) {
    }

    public void addValidationError(String field, String message) {
        if (Objects.isNull(validErrors))
            validErrors = new ArrayList<>();
        validErrors.add(new ValidationError(field, message));
    }
}