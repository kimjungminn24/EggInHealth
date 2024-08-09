package com.egginhealth.data.dto.pt;

public record PtUpdateDto(
        int memberId,
        int change

) {
    public static PtUpdateDto from(int memberId, int change) {
        return new PtUpdateDto(memberId, change);
    }
}
