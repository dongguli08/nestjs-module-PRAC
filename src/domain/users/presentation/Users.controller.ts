import {Controller, Get, Param, Req} from "@nestjs/common";
import {UserService} from "../service/Users.service";
import {UserEntity} from "../entity/Users.entity";



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {
    }

    @Get('db-info')
    getInfo(): string {
        return this.userService.getDbInfo();
    }

    @Get()
    findAllUsers():Promise<UserEntity[]>  {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    findOneUser(@Param('id')id:number):Promise<UserEntity>{
        return this.userService.findOneUser(id);
    }
}