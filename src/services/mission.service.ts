import { MISSIONTYPE } from "../domain/enums/mission.enum";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { UserRepoImpl } from "../infrastructure/repositoriesImpl/user.repositoryImpl";
import { WalletRepositoryImpl } from "../infrastructure/repositoriesImpl/wallet.repositoryImpl";

const userRepo = new UserRepoImpl();
const walletRepo = new WalletRepositoryImpl();
export const MissionService = {
  rewardToken: async (userId: string, type: string, reward: number) => {
    const findUser = await userRepo.findUserById(userId);
    if (!findUser) {
      throw new NotFoundException("Không tìm thấy người dùng");
    }
    let payload = {};
    switch (type) {
      case MISSIONTYPE.ONBOARD_DAILY:
        payload = { onBoardDaily: 2 };
    }

    await walletRepo.depositeWallet(userId, reward);
    return await userRepo.updateMissionUser(userId, payload);
  },
};
