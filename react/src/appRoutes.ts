import { NamesComponent } from './components/nameList';
import { NamingRulesComponent } from './components/namingRuleList';
import {AboutComponent} from './components/about';

const appRoutes = [
  {path: '/names', name: 'Names', component: NamesComponent},
  {path: '/naming-rules', name: 'Naming Rules', component: NamingRulesComponent},
  {path: '/about', name: 'About', component: AboutComponent},
];

export default appRoutes;
