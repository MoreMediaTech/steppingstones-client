'use client'
import React from 'react'

// components
import { columns } from './table-column'
import { DataTable } from '@components/table/data-table'

// hooks  (Controller)
import usePartnerDirectoryController from './use-partner-directory-controller'

// zod schemas
import { PartialPartnerWithOrganisationProps } from '@models/Partner'

export function PartnerDirectoryTable() {
  const { partnerData, handleDeleteMany } = usePartnerDirectoryController()
  return (
    <>
      <DataTable
        columns={columns}
        data={partnerData as PartialPartnerWithOrganisationProps[]}
        name={"organisation" || "projectsResponsibleFor" || "createdAt"}
        handleDeleteManyById={handleDeleteMany}
      />
    </>
  );
}

