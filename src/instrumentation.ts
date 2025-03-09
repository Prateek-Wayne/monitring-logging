/*instrumentation.ts*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import {
  ConsoleLogRecordExporter,
  SimpleLogRecordProcessor,
} from '@opentelemetry/sdk-logs';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'dice-roll app',
    [ATTR_SERVICE_VERSION]: '1.0.0',
  }),
  //   traceExporter: new ConsoleSpanExporter(),//to print in the console
  traceExporter: new OTLPTraceExporter(),
  // {url}
  // url:we can give url like this
  metricReader: new PeriodicExportingMetricReader({
    // exporter: new ConsoleMetricExporter(),// to print in  the console
    exporter: new OTLPMetricExporter(),
  }),
  logRecordProcessors: [
    new SimpleLogRecordProcessor(
      // new ConsoleLogRecordExporter() // to print in the console
      new OTLPLogExporter()
    ),
  ],
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
