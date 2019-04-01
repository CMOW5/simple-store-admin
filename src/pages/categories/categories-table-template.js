export default {
  'topcontrols': {
    'buttons': {
      'left': [
        {
          'icon': 'fa fa-plus',
          'class': 'is-success',
          'event': 'onCreateButtonClicked',
          'action': 'router',
          'label': 'Create',
          'route': 'administration.people.create',
        },
      ],
      'right': [

      ],
    },
  },
  'columns': [
    {
      'label': 'Name',
      'name': 'name',
      'data': 'people.title',
      'meta': {
        'searchable': true,
        'sortable': true,
        'translatable': false,
        'boolean': false,
        'slot': false,
        'rogue': false,
        'total': false,
        'date': false,
        'icon': false,
        'clickable': false,
        'customTotal': false,
        'notExportable': false,
        'nullLast': false,
        'visible': true,
        'hidden': false,
        'sort': null,
      },
    },
    {
      'label': 'Parent Category',
      'name': 'parentCategory.name',
      'data': 'people.appellative',
      'meta': {'searchable': true, 'sortable': true, 'translatable': false, 'boolean': false, 'slot': false, 'rogue': false, 'total': false, 'date': false, 'icon': false, 'clickable': false, 'customTotal': false, 'notExportable': false, 'nullLast': false, 'visible': true, 'hidden': false, 'sort': null},
    },
  ],
  'body': {
    data: [

    ],
  },
  'footer': {

  },
  'config': {
    'searchable': true,
    'debounce': 500,
    'actions': true,
    'actionsButtons': [
      {
        'icon': 'fa fa-eye',
        'class': '',
        'event': 'onActionButtonClicked',
        'action': 'show',
      },
      {
        'icon': 'fa fa-edit',
        'class': '',
        'event': 'onActionButtonClicked',
        'action': 'edit',
      },
      {
        'icon': 'fa fa-trash',
        'class': '',
        'event': 'onActionButtonClicked',
        'action': 'delete',
      },
    ],
    'labels': {'crtNo': '#', 'actions': 'Actions'},
  },
  'crtNo': true,
  'selectable': false,
  'translatable': false,
  'align': 'has-text-centered',
  'aligns': {
    'center': 'has-text-centered',
    'left': 'has-text-left',
    'right': 'has-text-right',
  },
  'style': 'is-hoverable',
  'styles': {
    'compact': 'is-narrow',
    'hover': 'is-hoverable',
    'striped': 'is-striped',
    'bordered': 'is-bordered',
  },
  'lengthMenu': [10, 15, 20, 25, 30],
  'highlight': 'has-background-info',
};
