﻿namespace CharacterSheetCreator.Dtos.User;

public class UpdateUserRequestDto
{
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}