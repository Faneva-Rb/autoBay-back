import { CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Role } from "src/generated/prisma/enums"
import { ROLES_KEY } from "../decorators/roles.decorator"

export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(
        context: ExecutionContext
    ): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ],
        )

        if(!requiredRoles){
            return false
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return requiredRoles.includes(user.role)
    }
}