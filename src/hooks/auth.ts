import { useAuthStore } from '@/store/modules/auth';

export const useAuth = () => {
  const authStore = useAuthStore();

  const hasAuth = (codes: string | string[]) => {
    if (!authStore.token) {
      return false;
    }

    if (typeof codes === 'string') {
      return authStore.userInfo.buttons.includes(codes);
    }

    return codes.some(code => authStore.userInfo.buttons.includes(code));
  }

  return {
    hasAuth
  };
}
