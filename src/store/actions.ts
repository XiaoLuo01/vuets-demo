import { ActionTree } from 'vuex';
import jwt_decode from 'jwt-decode';

const actions: ActionTree<any,any> = {
  async setUser({state, commit}, user: any) {
    const decode = jwt_decode(user);
    commit("SET_USER", decode);
  }
}
export default actions