// SemanticUI-free pre-@plone/components
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import MobileNavigation from '@kitconcept/volto-light-theme/components/MobileNavigation/MobileNavigation';
import { useIntl, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import cx from 'classnames';
import IntranetSearchWidget from '@kitconcept/volto-light-theme/components/SearchWidget/IntranetSearchWidget';
import SimboloRS from '../../../../components/SimboloRS/SimboloRS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Anontools,
  LanguageSelector,
  Navigation,
  UniversalLink,
} from '@plone/volto/components';
import BarraEstado from '../../../../components/BarraEstado/BarraEstado';
import BarraAcessibilidade from '../../../../components/BarraAcessibilidade/BarraAcessibilidade';
import SecretariaNome from '../../../../components/SecretariaNome/SecretariaNome';
import SearchWidget from '../../../../components/SearchWidget/SearchWidget';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const messages = defineMessages({
  siteLabel: {
    id: 'siteLabel',
    defaultMessage: ' ',
  },
});

const InternetHeader = ({
  pathname,
  siteLabel,
  token,
  siteAction,
  siteTitle,
}) => {
  const navRoot = useSelector((state) => state.navroot?.data?.navroot);
  const nome_sec = navRoot?.nome_secretaria_vinculada;
  const url_sec = navRoot?.url_secretaria_vinculada;

  return (
    <>
      <div className="header">
        <div className="tools-wrapper">
          <SecretariaNome content={nome_sec} url={url_sec} />
          <LanguageSelector />
          <div className="tools">
            {!token && <Anontools />}
            {siteAction &&
              siteAction.map((item) => (
                <UniversalLink key={item.url} href={item.url}>
                  {item.title}
                </UniversalLink>
              ))}
          </div>
          {siteLabel && (
            <div className="intranet">
              <p>{siteLabel}</p>
            </div>
          )}
        </div>
        <div className="logo-nav-wrapper">
          <div className="simbolo">
            <SimboloRS />
            <a className="header-titulo" href="/">
              {siteTitle}
            </a>
          </div>
          <Navigation pathname={pathname} />
          <MobileNavigation pathname={pathname} />
          <div className="search-wrapper navigation-desktop">
            <div className="search">
              <SearchWidget />
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <a
            href="#main"
            class="btn-scroll"
            style={{
              cursor: 'pointer',
              padding: '25px 29px',
              color: '#fff',
              backgroundColor: '#607F35',
              borderRadius: '50px',
              position: 'fixed',
              bottom: '45px',
              right: '10%',
              zIndex: '9999',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.4)',
              border: '3px solid transparent',
            }}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </a>
        </div>
      </div>
    </>
  );
};

const IntranetHeader = ({
  pathname,
  siteLabel,
  token,
  siteAction,
  siteTitle,
}) => {
  return (
    <>
      <div className="header">
        <div className="tools-wrapper">
          <LanguageSelector />
          <div className="tools">
            {!token && <Anontools />}
            {siteAction &&
              siteAction.map((item) => (
                <UniversalLink key={item.url} href={item.url}>
                  {item.title}
                </UniversalLink>
              ))}
          </div>
          {siteLabel && (
            <div className="intranet">
              <p>{siteLabel}</p>
            </div>
          )}
        </div>
        <div className="logo-nav-wrapper">
          <div className="simbolo">
            <SimboloRS />
            {siteTitle}
          </div>
          <div className="search-wrapper">
            <div className="search">
              <IntranetSearchWidget />
            </div>
          </div>

          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </>
  );
};

const Header = (props) => {
  const { pathname } = props;
  let siteLabel = config.settings.siteLabel;
  const intranetHeader = config.settings.intranetHeader;
  const token = useSelector((state) => state.userSession.token);
  const siteAction = useSelector(
    (state) => state.content.data?.['@components']?.actions?.site_actions,
  );
  const intl = useIntl();
  const translatedSiteLabel = intl.formatMessage(messages.siteLabel);
  const site = useSelector((state) => state.site.data);

  const siteTitle = site['plone.site_title'];

  siteLabel =
    siteLabel &&
    (translatedSiteLabel !== 'siteLabel' && translatedSiteLabel !== ' '
      ? translatedSiteLabel
      : siteLabel);

  return (
    <header
      className={cx('header-wrapper', { 'intranet-header': intranetHeader })}
    >
      <BarraEstado />
      <BarraAcessibilidade />
      <Container>
        {intranetHeader ? (
          <IntranetHeader
            pathname={pathname}
            siteLabel={siteLabel}
            token={token}
            siteAction={siteAction}
            siteTitle={siteTitle}
          />
        ) : (
          <InternetHeader
            pathname={pathname}
            siteLabel={siteLabel}
            token={token}
            siteAction={siteAction}
            siteTitle={siteTitle}
          />
        )}
      </Container>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

Header.defaultProps = {
  token: null,
};

export default Header;
