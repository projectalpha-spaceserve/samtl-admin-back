import { Controller, Post, Get, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HillpostService } from './hillpost.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Hillpost')
@Controller('hillpost')
export class HillpostController {
  constructor(private readonly hillpostService: HillpostService) { }

  @Post('device-change')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Device change' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account_no: { type: 'string' },
        requester_name: { type: 'string' },
        comment: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Device change' })
  async deviceChange(@CurrentUser() user: any, @Body() body: any) {
    return await this.hillpostService.deviceChange(body);
  }

  @Post('reset-account')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset/Clear user account' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account_no: { type: 'string' },
        requester_name: { type: 'string' },
        comment: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Reset account' })
  async resetAccount(@CurrentUser() user: any, @Body() body: any) {
    return await this.hillpostService.resetAccount(body);
  }

  @Post('unblock-user')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unblock user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account_no: { type: 'string' },
        requester_name: { type: 'string' },
        comment: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Unblock user' })
  async unblockUser(@CurrentUser() user: any, @Body() body: any) {
    return await this.hillpostService.unblockUser(body);
  }

  @Post('enable-security-reset')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enable security question reset' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account_no: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Enable security reset' })
  async enableSecurityReset(@CurrentUser() user: any, @Body() body: any) {
    return await this.hillpostService.enableSecurityReset(body);
  }

  // @Get('user/:account_number')
  // @HttpCode(200)
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Get user details by account number' })
  // @ApiResponse({ status: 200, description: 'Get user details' })
  // async getUserDetails(@CurrentUser() user: any, @Param('account_number') account_number: string) {
  //   return await this.hillpostService.getUserDetails(account_number);
  // }
}