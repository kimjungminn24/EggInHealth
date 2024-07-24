package com.egginhealth.data.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Data
public class CommonId {
    @Column(name = "common_id")
    private int id;

    @Column(name = "group_code", length = 4)
    private String groupCode;
}