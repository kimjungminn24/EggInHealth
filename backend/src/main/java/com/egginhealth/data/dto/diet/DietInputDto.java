package com.egginhealth.data.dto.diet;

import org.springframework.web.multipart.MultipartFile;


public record DietInputDto(
        int type,
        String date,
        MultipartFile image
) {

}
