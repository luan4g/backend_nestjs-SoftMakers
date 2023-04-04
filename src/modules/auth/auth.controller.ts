import { Body, Controller, Post } from "@nestjs/common";
import { UserAuthValidate } from "./validations/user.auth.validate";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() data: UserAuthValidate) {
    return this.authService.auth(data)
  }
}