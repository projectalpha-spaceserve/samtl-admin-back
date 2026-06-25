import { Controller, Get, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiResponse({ status: 200, description: 'Get admin profile' })
  async getProfile(@CurrentUser() user: any) {
    return await this.profileService.getProfile(user);
  }

  @Post('update')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update admin profile' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        phone: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Update admin profile' })
  async updateProfile(@CurrentUser() user: any, @Body() body: any) {
    return await this.profileService.updateProfile(user, body);
  }
}