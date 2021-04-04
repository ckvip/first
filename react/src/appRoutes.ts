import { NamesComponent } from "./components/nameList";
import { NamingRulesComponent } from "./components/namingRuleList";

const appRoutes = [
  {path: '/names', name: 'Names', component: NamesComponent},
  {path: '/naming-rules', name: 'Naming Rules', component: NamingRulesComponent},
];

export default appRoutes;
