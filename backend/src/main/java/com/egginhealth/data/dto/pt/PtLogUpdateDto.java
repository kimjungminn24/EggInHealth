package com.egginhealth.data.dto.pt;

public record PtLogUpdateDto(
        int memberId,
        int change

) {
    public static PtLogUpdateDto from(int memberId, int change) {
        return new PtLogUpdateDto(memberId, change);
    }
}
