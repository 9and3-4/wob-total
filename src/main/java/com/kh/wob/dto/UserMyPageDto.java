package com.kh.wob.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMyPageDto {
    private Long id;
    private String email;
    private String password;
    private String nickname;
    private String introduce;
    private String image;
    private String mbti;
    private List<String> interestSports;
    private String withdrawal;
    private String active;
}
