export default {
  logo: <span style={{ fontWeight: 600 }}>Logger</span>,
  project: {
    link: 'https://github.com/PolGubau/logger',
  },
  docsRepositoryBase: 'https://github.com/PolGubau/logger/tree/main/website',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Logger',
    };
  },
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://logger.polgubau.com" target="_blank">
          Logger
        </a>
        .
      </span>
    ),
  },
  // ... other theme options
};
