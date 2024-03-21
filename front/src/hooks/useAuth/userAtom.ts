// This TypeScript file defines an atom from the Jotai library to manage the user's state in a React application.
// It imports the 'atom' function from Jotai for state management and the 'PostApiLoginBodyResponse' type
// from a local service module to type-check the user state. It attempts to retrieve the user data from
// localStorage, parsing it if found, and initializes the 'userAtom' with either the retrieved user data or null.
// This setup facilitates global state management for user data across the application using Jotai.

import { atom } from 'jotai/index'
import { PostApiLoginBodyResponse } from '../../services/auth/login.ts'

const storedUserData = localStorage.getItem('userData')
const initialUserState: PostApiLoginBodyResponse | null = storedUserData
  ? JSON.parse(storedUserData)
  : null

export const userAtom = atom<PostApiLoginBodyResponse | null>(initialUserState)
