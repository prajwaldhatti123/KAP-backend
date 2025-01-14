"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkoutSessionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_workout_session_dto_1 = require("./create-workout-session.dto");
class UpdateWorkoutSessionDto extends (0, mapped_types_1.PartialType)(create_workout_session_dto_1.CreateWorkoutSessionDto) {
}
exports.UpdateWorkoutSessionDto = UpdateWorkoutSessionDto;
//# sourceMappingURL=update-workout-session.dto.js.map