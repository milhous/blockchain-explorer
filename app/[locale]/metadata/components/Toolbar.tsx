import CompSearch from './Search';
import CompResultSort from './ResultSort';
import CompSwitchShowMode from './SwitchShowMode';
import './Toolbar.scss';

export default function Toolbar() {
  return (
    <section className="metadata-toolbar">
      <CompSearch />
      <div className="metadata-toolbar_box">
        <CompResultSort />
        <CompSwitchShowMode />
      </div>
    </section>
  );
}
