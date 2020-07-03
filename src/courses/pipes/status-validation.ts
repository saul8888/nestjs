import { PipeTransform, BadRequestException } from "@nestjs/common";
import { CourseStatus } from "../new.enum/status";


export class CourseValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        CourseStatus.DACT,
        CourseStatus.ACT,
    ];

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
      }

    transform(value:any){
        value = value.toUpperCase()
        
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
}