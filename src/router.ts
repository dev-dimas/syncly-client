// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/app`
  | `/app/projects/:projectId`

export type Params = {
  '/app/projects/:projectId': { projectId: string }
}

export type ModalPath = `/app/change-password` | `/app/confirm-logout` | `/app/create-project` | `/app/edit-profile` | `/app/projects/add-remove-task-assignee` | `/app/projects/confirm-delete-task` | `/app/projects/confirm-leave-project` | `/app/projects/confirm-remove-member` | `/app/projects/create-task` | `/app/projects/manage-members` | `/app/projects/task-detail` | `/app/projects/update-task` | `/login` | `/sign-up`

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
