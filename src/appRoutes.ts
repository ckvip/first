import {NamesComponent} from "./components/names";
import {NamingRulesComponent} from "./components/nameRules";

const appRoutes = [
    {path: '/names', name: 'Names', components: NamesComponent},
    {path: '/naming-rules', name: 'Naming Rules', components: NamingRulesComponent},
];

export default appRoutes;
