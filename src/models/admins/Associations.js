import Sector from './Sector.js';
import EducationBranch from './EducationBranch.js';
import EducationProgram from './EducationProgram.js';
import ICTService from './ICTService.js';
import PrintingPackaging from './PrintingPackaging.js';
import MicrofinanceService from './MicrofinanceService.js';
import Admin from './Admin.js';
import ShareHolder from './ShareHolder.js';
import Share from './Share.js';
import Vote from './Vote.js';
import VoteResult from './VoteResult.js';
import Candidate from './Candidate.js';
import VotingSession from './VotingSession.js';
import VoteJoined from './VoteJoined.js';

ShareHolder.belongsTo(Admin, { foreignKey: 'userId', as: 'usedData' });

Admin.hasMany(Vote, { foreignKey: 'userId', as: 'voteData' });
Vote.belongsTo(Admin, { foreignKey: 'userId', as: 'usedData' });

Share.hasMany(ShareHolder, { foreignKey: 'shareId', as: 'shareholder' });
ShareHolder.belongsTo(Share, { foreignKey: 'shareId', as: 'shareData' });

Vote.hasMany(VoteResult, { foreignKey: 'voteId', as: 'voteResult' });
VoteResult.belongsTo(Vote, { foreignKey: 'voteId', as: 'voteData' });

Vote.hasMany(ShareHolder, { foreignKey: 'shareHolderId', as: 'shareholder' });
ShareHolder.belongsTo(Vote, { foreignKey: 'shareHolderId', as: 'voteData' });

ShareHolder.hasMany(VoteJoined, { foreignKey: 'shareHolderId', as: 'voteJoined' });
VoteJoined.belongsTo(ShareHolder, { foreignKey: 'shareHolderId', as: 'shareHolderData' });

VotingSession.hasMany(VoteJoined, { foreignKey: 'sessionId', as: 'voteJoined' });
VoteJoined.belongsTo(VotingSession, { foreignKey: 'sessionId', as: 'sessionData' });

VotingSession.hasMany(Candidate, { foreignKey: 'sessionId', as: 'candidate' });
Candidate.belongsTo(VotingSession, { foreignKey: 'sessionId', as: 'sessionData' });

Sector.hasMany(EducationBranch, { foreignKey: 'sectorId', as: 'sectorEducation' });
EducationBranch.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sectorData' });

EducationBranch.hasMany(EducationProgram, { foreignKey: 'branchId', as: 'branchProgram' });
EducationProgram.belongsTo(EducationBranch, { foreignKey: 'branchId', as: 'programBranch' });

Sector.hasMany(ICTService, { foreignKey: 'sectorId', as: 'sectorService' });
ICTService.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sectorData' });

Sector.hasMany(PrintingPackaging, { foreignKey: 'sectorId', as: 'sectorPrinting' });
PrintingPackaging.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sectorData' });

Sector.hasMany(MicrofinanceService, { foreignKey: 'sectorId', as: 'sectorMicrofinance' });
MicrofinanceService.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sectorData' });


export { Sector, EducationBranch, EducationProgram, ICTService, PrintingPackaging,
     MicrofinanceService, Admin, ShareHolder, Share, Vote, VoteResult, Candidate,
    VotingSession, VoteJoined };
     