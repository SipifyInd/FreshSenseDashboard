import { RootState } from "@/components/redux/store";
import { createSelector } from "reselect";

// Account selectors
const accountState = (state: RootState) => state.account;

// Memoized selector
export const selectAccountData = createSelector([accountState], (account) => ({
  userId: account.userId,
}));
