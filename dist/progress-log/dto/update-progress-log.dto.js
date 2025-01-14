"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProgressLogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_progress_log_dto_1 = require("./create-progress-log.dto");
class UpdateProgressLogDto extends (0, mapped_types_1.PartialType)(create_progress_log_dto_1.CreateProgressLogDto) {
}
exports.UpdateProgressLogDto = UpdateProgressLogDto;
//# sourceMappingURL=update-progress-log.dto.js.map