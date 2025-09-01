import {Body, Controller, Delete, Get, Param, Post, Req, ValidationPipe} from "@nestjs/common";
import {UserService} from "../service/Users.service";
import {UserEntity} from "../entity/Users.entity";
import {CreateUserDto} from "./dto/request/CreateUser.dto";
import {LoginUserDto} from "./dto/request/LoginUser.dto";



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {
    }
    // DB 정보 확인용
    @Get('db-info')
    getInfo(): string {
        return this.userService.getDbInfo();
    }

    // 전체 유저 조회
    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAllUsers();
    }

    // 단일 유저 조회
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UserEntity> {
        return this.userService.findOneUser(id);
    }

    // 회원가입
    @Post('/register')
    async register(
        @Body(new ValidationPipe()) data: CreateUserDto,
    ): Promise<UserEntity> {
        return this.userService.createUser(data);
    }

    //로그인
    @Post('/login')
    async login(
        @Body(new ValidationPipe()) data:LoginUserDto,
    ):Promise<UserEntity>{
        return this.userService.loginUser(data)
    }

    //삭제
    @Delete()
}