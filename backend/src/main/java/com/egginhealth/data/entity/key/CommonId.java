package com.egginhealth.data.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class CommonId implements Serializable {
    @Column(name = "common_id")
    private int id;

    @Column(name = "group_code", length = 4)
    private String groupCode;
}