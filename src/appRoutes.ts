import {NamesComponent} from "./components/names";
import {NamingRulesComponent} from "./components/nameRules";

const appRoutes = [
    {path: '/names', name: 'Names', component: NamesComponent},
    {path: '/naming-rules', name: 'Naming Rules', component: NamingRulesComponent},
];

export default appRoutes;
