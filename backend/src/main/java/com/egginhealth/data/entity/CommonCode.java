package com.egginhealth.data.entity;

import com.egginhealth.data.entity.key.CommonId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommonCode {
    @EmbeddedId
    private CommonId id;

    @Column(name = "type", length = 20)
    private String type;
}
