<?php

/**
 * @file
 * Configuration page for Easy Admin menu
 */

/**
 * Configuration form for Easy Admin menu.
 */
function easy_admin_config_form($form, &$form_state) {

  $form['menu'] = array(
    '#type' => 'hidden',
    '#title' => t('Menu to use for the Easy Admin toolbar'),
    '#default_value' => 'manager',
  );

  $form['roles'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Display the menu for the following roles:'),
    '#options' => array_map('check_plain', user_roles(FALSE)),
    '#default_value' => variable_get('easy_admin_roles', array()),
  );

  $form['show_root'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show for Root (User:1)'),
    '#default_value' => variable_get('easy_admin_show_root', TRUE),
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save configuration'),
  );

  return $form;
}

/**
 * Submit handler for the Easy Admin configuration form.
 */
function easy_admin_config_form_submit($form, &$form_state) {
  $values = $form_state['values'];

  $roles = $values['roles'];
  // $roles is a map. Keys: every role id. Values: same as key, when selected,
  // 0 otherwise.
  // We prefer a simpler datastructure: An array of role ids.
  // array_filter() is used to remove the key/value pairs with value==0.
  // This leaves an array like this: array(3 => "3", 4 => "5").
  // array_keys() is used to make it like this: array(3, 4).
  $roles = array_keys(array_filter($roles));

  // Now save all the values with variable_set.
  // We could almost have used system_settings_form - but not quite, because we
  // wanted to store the roles as a simple array of role ids.
  variable_set('easy_admin_roles', $roles);
  variable_set('easy_admin_show_root', $values['show_root']);
  variable_set('easy_admin_menu', $values['menu']);
}
