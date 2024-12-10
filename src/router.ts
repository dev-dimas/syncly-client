// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/app`
  | `/app/projects/:projectId`
  | `/login`
  | `/sign-up`

export type Params = {
  '/app/projects/:projectId': { projectId: string }
}

export type ModalPath = `/app/projects/create-task` | `/app/projects/manage-members` | `/app/projects/task-detail`

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
