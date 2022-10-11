import React, { useState, useEffect, useMemo }from "react";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications';
import { Card, CardTitle, CardBody, Table, Row, Col } from "reactstrap";
import Switch from "react-bootstrap-switch";
import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";
import useAuth from '../../hooks/useAuth';
import useFetchResource from '../../hooks/useFetchResource'


export default function ListUser(props) {
  const [users, setUsers] = useState([]);
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  const { authUser } = useAuth(ctx => ctx)

  const params = useMemo(() => ({ page: 0, limit: 1 }), [])
  const { resourceData: userData, loadingState: userDataLoading } = useFetchResource({ errorHeader: "Liste des utilisateurs", resourceService: "adminService", action: "getAll", params })

  useEffect(() => {
    if (!userDataLoading && userData.length) {
      setUsers(userData)
    }
  }, [userData, userDataLoading])
 
  async function changeUserState (e, user) {
    try {
      await $api.adminService.update(user.id, { isActivated: e })
    } catch (error) {
      const message = error?.response?.data.error.message || error.message;
      addToast($message({ header: 'Liste utilisateurs', message }), { appearance: 'error', autoDismiss: true })
    }
  }

  async function changeUserRole (e, user) {
    try {
      await $api.adminService.update(user.id, { role: e })
    } catch (error) {
      const message = error?.response?.data.error.message || error.message;
      addToast($message({ header: 'Liste utilisateurs', message }), { appearance: 'error', autoDismiss: true })
    }
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <h2>Liste des utilisateurs</h2>
          </CardTitle>
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Nom & Prénoms</th>
                  <th className="border-0">Email</th>
                  <th className="border-0">Role</th>
                  <th className="border-0">Statut</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.length > 0 ? users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <h5 className="mb-0 font-16 font-medium">{ user.name }</h5>
                        </td>
                        <td> { user.email } </td>
                        <td>
                          <select defaultValue={user.role} disabled={authUser.id === user.id } onChange={(e) => { e.persist(); changeUserRole(e.target.value, user) }}>
                            <option value="superadmin">Superadmin</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </td>
                        <td>
                          <span>
                            <Switch disabled={authUser.id === user.id } key={user.id} defaultValue={user.isActivated} onText="Activé" offText="Désactivé" onChange={(e) =>  changeUserState(e.state.value, user)} />
                          </span>
                        </td>
                      </tr>
                    );
                  }) :

                  <tr>
                    <td colSpan="5" align='center'><h5>Pas d'users</h5></td>
                  </tr>
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
