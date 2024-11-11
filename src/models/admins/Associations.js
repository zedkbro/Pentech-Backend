import Sector from './Sector.js';
import EducationBranch from './EducationBranch.js';
import EducationProgram from './EducationProgram.js';
import ICTService from './ICTService.js';
import PrintingPackaging from './PrintingPackaging.js';
import MicrofinanceServices from './MicroFinanceServices.js';

Sector.hasMany(EducationBranch, { foreignKey: 'sectorId', as: 'sectorEducation' });
EducationBranch.belongsTo(Sector, { foreignKey: 'sectorId', as: 'SectorData' });

EducationBranch.hasMany(EducationProgram, { foreignKey: 'branchId', as: 'branchProgram' });
EducationProgram.belongsTo(EducationBranch, { foreignKey: 'branchId', as: 'programBranch' });

Sector.hasMany(ICTService, { foreignKey: 'sectorId', as: 'sectorService' });
ICTService.belongsTo(Sector, { foreignKey: 'sectorId', as: 'SectorData' });

Sector.hasMany(PrintingPackaging, { foreignKey: 'sectorId', as: 'sectorPrinting' });
PrintingPackaging.belongsTo(Sector, { foreignKey: 'sectorId', as: 'SectorData' });

Sector.hasMany(MicrofinanceServices, { foreignKey: 'sectorId', as: 'sectorMicrofinance' });
MicrofinanceServices.belongsTo(Sector, { foreignKey: 'sectorId', as: 'SectorData' });


export { Sector, EducationBranch, EducationProgram, ICTService, PrintingPackaging, MicrofinanceServices };