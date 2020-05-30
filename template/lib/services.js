const MessageHandler = require('./MessageHandler.js');

const services = {};

{%- for channelName, channel in asyncapi.channels() -%}
{%- set path = channelName -%}
{%- if channelName === '/' -%}
{%- set channelName = 'root' -%}
{%- set path = '' -%}
{%- endif %}
services.{{ channelName | camelCase }} = {
  path: '{{ path | camelCase }}',
  handlers: []
};

{% if channel.hasSubscribe() -%}
{%- for message in channel.subscribe().messages() -%}

{%- if message.name() === undefined -%}
{{ 'This template requires name to be set in every message.' | logError }}
{%- endif -%}

services.{{ channelName | camelCase }}.handlers.push(new MessageHandler('{{ message.name() | camelCase }}',
  {{ message.payload()._json | dump | safe }}));

{% endfor -%}
{%- endif -%}
{%- endfor -%}

module.exports = services;
