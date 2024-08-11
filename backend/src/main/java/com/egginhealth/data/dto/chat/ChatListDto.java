package com.egginhealth.data.dto.chat;

import com.egginhealth.data.entity.ChatRoom;
import com.egginhealth.data.entity.Member;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ChatListDto(
        int memberId,
        String memberName,
        String memberImgUrl,
        String lastContent,
        LocalDateTime lastDate
) {

    public static ChatListDto fromChat(ChatListDto chatListDto, ChatRoom chatRoom) {
        if (chatRoom == null) {
            return ChatListDto.builder()
                    .memberId(chatListDto.memberId())
                    .memberName(chatListDto.memberName())
                    .memberImgUrl(chatListDto.memberImgUrl())
                    .lastContent("대화내역이 없습니다.")
                    .lastDate(chatListDto.lastDate())
                    .build();
        } else {
            return ChatListDto.builder()
                    .memberId(chatListDto.memberId())
                    .memberName(chatListDto.memberName())
                    .memberImgUrl(chatListDto.memberImgUrl())
                    .lastContent(chatRoom.getChatList().get(chatRoom.getChatList().size() - 1).getContent())
                    .lastDate(chatRoom.getChatList().get(chatRoom.getChatList().size() - 1).getCreatedAt())
                    .build();
        }
    }

    public static ChatListDto fromMember(Member member) {
        if (member == null) {
            throw new IllegalArgumentException("Member can not be null");
        }

        return ChatListDto.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .memberImgUrl(member.getImgUrl())
                .lastDate(member.getCreatedAt())
                .build();
    }
}
