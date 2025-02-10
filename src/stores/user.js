// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserPermission from '@/enums/UserPermission'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const permission = ref(UserPermission.USER)
    const name = ref('')

    const isLoggedIn = computed(() => {
      console.log('isLoggedIn:', token.value.length > 0)
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return (
        permission.value === UserPermission.ADMIN || permission.value === UserPermission.SUPER_ADMIN
      )
    })

    const login = async (data) => {
      console.log('login data:', data)
      if (data.token) {
        token.value = data.token
      }
      account.value = data.account
      permission.value = data.permission
      name.value = data.name
    }

    const logout = () => {
      console.log('logout')
      token.value = ''
      account.value = ''
      permission.value = UserPermission.USER
      name.value = ''
    }

    return {
      token,
      account,
      permission,
      name,
      isLoggedIn,
      isAdmin,
      login,
      logout,
    }
  },
  {
    persist: {
      key: 'ramen-user',
      pick: ['token'],
    },
  },
)
