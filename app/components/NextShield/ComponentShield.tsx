import { ComponentShieldAuthProps, ComponentShieldBaseProps, ComponentShieldProps, ComponentShieldRBACProps } from "@lib/types"


 function ComponentShield(props: ComponentShieldBaseProps): JSX.Element
 function ComponentShield(props: ComponentShieldAuthProps): JSX.Element
 function ComponentShield(props: ComponentShieldRBACProps): JSX.Element
 function ComponentShield(props: ComponentShieldProps): JSX.Element {
  const {
    showForRole,
    showIf,
    fallback = null,
    RBAC,
    userRole,
    children,
  } = props

  if (RBAC && userRole) return <>{showForRole?.includes(userRole) ? children : null}</>
  if (showIf) return <>{children}</>

  return <>{fallback}</>
}

export default ComponentShield;