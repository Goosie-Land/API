import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { JWTService } from '../services/jwt.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppError } from '../utils/AppError';
import { CreateUserDto, FilterUserDto, LogUserDto, UpdateUserSettingsDto, UserPresenter, UserSettingsPresenter } from '../dtos/user.dto';
import { EncodedRequest } from '../utils/EncodedRequest';

// filepath: d:/Projet Dev/OiePI/src/controllers/user.controller.ts

export class UserController {
    private userService: UserService;
    private jwtService: JWTService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JWTService();
    }

    async logUser(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const logUserData = plainToClass(LogUserDto, req.body, { excludeExtraneousValues: true });
            const dtoErrors = await validate(logUserData);
            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => ({
                    field: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }));
                throw new AppError("Validation failed", 400, errors);
            }
            const user = await this.userService.logUser(logUserData);
            const presenter = plainToClass(UserPresenter, user, { excludeExtraneousValues: true })

            const accessToken = this.jwtService.generateAccessToken(presenter);
            const refreshToken = this.jwtService.generateRefreshToken(presenter);

            res.status(200).json({ accessToken, refreshToken });
        }
        catch (error) {
            next(error);
        }
    }

    async getUsersByFilters(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const filters = plainToClass(FilterUserDto, req.query);
            const dtoErrors = await validate(filters);
            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => ({
                    field: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }));
                throw new AppError("Validation failed", 400, errors);
            }
            const users = await this.userService.getUsersByFilters(filters);
            
            const presenter = plainToClass(UserPresenter, users, { excludeExtraneousValues: true });

            if (users && users.length > 0) {
                console.log(users[0].settings[0].setting);
                if (Array.isArray(presenter)) {
                    console.log(presenter[0].settings[0]);
                }
                res.status(200).json(presenter);
            } else {
                res.status(404).json({ message: 'No users found' });
            }
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const createUserData = plainToClass(CreateUserDto, req.body);
            const dtoErrors = await validate(createUserData);
            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => ({
                    field: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }));
                throw new AppError("Validation failed", 400, errors);
            }
            const user = await this.userService.createUser(createUserData);
            const presenter = plainToClass(UserPresenter, user, { excludeExtraneousValues: true })
            res.status(201).json(presenter);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: EncodedRequest, res: Response, next: Function): Promise<void> {
        try {
            const { refresh } = req.body;
            const decoded = await this.jwtService.verifyJWTSecret(refresh);
            const user = plainToClass(UserPresenter, decoded.user, { excludeExtraneousValues: true });

            if (user && user.settings) {
                const accessToken = this.jwtService.generateAccessToken(user)
          
                res.status(200).json({ accessToken });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    async getUserByScore(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const users = await this.userService.getUsersByScore();
            const presenter = plainToClass(UserPresenter, users, { excludeExtraneousValues: true })

            if (users && users.length > 0) {
                res.status(200).json(presenter);
            } else {
                res.status(404).json({ message: 'No users found' });
            }
        } catch (error) {
            next(error);
        }
    }

    async getMe(req: EncodedRequest, res: Response, next: Function): Promise<void> {
        try {
            const { token } = req.body;
            const decoded = await this.jwtService.verifyJWT(token);
            const user = await this.userService.getOneBy({ id: decoded.user.id })
            const presenter = plainToClass(UserPresenter, user, { excludeExtraneousValues: true });

            res.status(200).json(presenter);
        } catch (error) {
            next(error);
        }
    }
}