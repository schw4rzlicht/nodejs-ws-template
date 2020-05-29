import MessageHandler from './MessageHandler.js';

const services = {};

{%- for channelName, channel in asyncapi.channels() %}
services.{{ channelName | camelCase }} = {
  path: '{{ channelName | camelCase }}',
  handlers: []
};

{%- if channel.hasSubscribe() %}
{%- for message in channel.subscribe().messages() %}

{%- if message.name() === undefined -%}
{{ 'This template requires name to be set in every message.' | logError }}
{%- endif -%}

services.{{ channelName | camelCase }}.handlers.push(new MessageHandler('{{ message.name() | camelCase }}', event => {
  return typeof event.data === '{{ message.payload().type() }}'; // TODO
}));

{% endfor %}
{%- endif %}
{% endfor %}

export default services;
