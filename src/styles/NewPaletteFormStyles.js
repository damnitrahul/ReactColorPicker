const drawerWidth = 340;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  ToolBar: {
    display: 'flex',
    justifyContent: 'space-between !important',
    width: '100%',
    margin: '0 1rem'
  },
  ToolBarInner: {
    display: 'flex',
    justifyContent: 'space-between !important',
    '& button': {
      marginRight: '2rem'
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    width: '100%',
    height: '100vh'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  colorBoxArea: {
    width: '100%'
  },
  sideBar: {
    '& p:first-child': {
      fontSize: '30px',
      textAlign: 'center',
      margin: '2rem 0'
    },
    '& button': {
      margin: ' 0 2rem 2rem 2rem',
      display: 'block',
      width: '100%'
    },
    '& input': {
      display: 'block',
      width: '100%'
    },
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .sketch-picker': {
      margin: '1rem 0'
    },
    '& form': {
      height: '200px',
      '& button': {
        margin: '2rem 0'
      }
    },
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    padding: '2rem'
  }
});

export default styles;
