# Deepgram SDK exists test

import pytest
from deepgram_sdk import DeepgramSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DeepgramSDK.test(None, None)
        assert testsdk is not None
